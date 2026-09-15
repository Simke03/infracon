# Rebuilds app/fonts/InfraconDisplay-*.woff2 from Orbitron[wght].ttf
# (github.com/google/fonts/tree/main/ofl/orbitron). Needs: pip install fonttools brotli
#
# Orbitron ships only basic Latin + Latin-1. This adds the rest of Latin-1 and all of
# Latin Extended-A, built from Orbitron's own letters and accent marks, plus the
# baseline quotes and guillemets used in Montenegrin/Serbian/Croatian text.
# The OFL Reserved Font Name forbids calling the result "Orbitron".
import sys
import unicodedata
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.recordingPen import RecordingPen
from fontTools.pens.ttGlyphPen import TTGlyphPen

SRC = sys.argv[1] if len(sys.argv) > 1 else 'Orbitron.ttf'
OUT = sys.argv[2] if len(sys.argv) > 2 else '.'

MARK_WORDS = {
    'macron': 'MACRON', 'breve': 'BREVE', 'ogonek': 'OGONEK', 'acute': 'ACUTE',
    'circumflex': 'CIRCUMFLEX', 'dotaccent': 'DOT ABOVE', 'caron': 'CARON',
    'tilde': 'TILDE', 'ring': 'RING ABOVE', 'hungarumlaut': 'DOUBLE ACUTE',
    'commaaccent': 'CEDILLA', 'cedilla': 'CEDILLA', 'grave': 'GRAVE', 'dieresis': 'DIAERESIS',
}

# (base letter, mark) for every accented letter Orbitron lacks
ACCENTED = {
    'A': 'macron breve ogonek', 'C': 'acute circumflex dotaccent caron',
    'D': 'caron', 'E': 'macron breve dotaccent ogonek caron',
    'G': 'circumflex breve dotaccent commaaccent', 'H': 'circumflex',
    'I': 'tilde macron breve ogonek dotaccent', 'J': 'circumflex', 'K': 'commaaccent',
    'L': 'acute commaaccent', 'N': 'acute commaaccent caron',
    'O': 'macron breve hungarumlaut', 'R': 'acute commaaccent caron',
    'S': 'acute circumflex cedilla', 'T': 'cedilla caron',
    'U': 'tilde macron breve ring hungarumlaut ogonek', 'W': 'circumflex',
    'Y': 'circumflex', 'Z': 'acute dotaccent',
}


def codepoint(base, mark):
    case = 'CAPITAL' if base.isupper() else 'SMALL'
    word = MARK_WORDS[mark]
    for w in ([word, 'COMMA BELOW'] if mark == 'commaaccent' else [word]):
        try:
            return ord(unicodedata.lookup(f'LATIN {case} LETTER {base.upper()} WITH {w}'))
        except KeyError:
            continue
    raise KeyError(base + mark)


def build(weight, style):
    f = instantiateVariableFont(TTFont(SRC), {'wght': weight})
    glyf, hmtx = f['glyf'], f['hmtx']
    gs = f.getGlyphSet()

    def bounds(n):
        g = glyf[n]; g.recalcBounds(glyf)
        return g.xMin, g.yMin, g.xMax, g.yMax

    def cx(n):
        b = bounds(n); return (b[0] + b[2]) / 2

    def outline(n):
        rec = RecordingPen(); f.getGlyphSet()[n].draw(rec); return rec.value

    # Stroke metrics from E: stem width and crossbar band
    pts = [p[1][0] for p in outline('E') if p[0] in ('moveTo', 'lineTo')]
    stem = pts[4][0] - pts[0][0]
    bar_lo, bar_hi = pts[8][1], pts[6][1]
    bar = bar_hi - bar_lo
    xh, cap = f['OS/2'].sxHeight, f['OS/2'].sCapHeight
    asc = bounds('l')[3]
    lift_cap = cap - xh                      # how far Orbitron raises marks for capitals
    lift_asc = asc - xh + (bounds('acutecomb')[1] - xh)

    new = {}  # name -> (pen or glyph, advance, codepoint or None)

    def pen_with(*components):
        pen = TTGlyphPen(f.getGlyphSet())
        for name, dx, dy in components:
            pen.addComponent(name, (1, 0, 0, 1, round(dx), round(dy)))
        return pen

    def rect(pen, x0, y0, x1, y1):
        pen.moveTo((x0, y0)); pen.lineTo((x0, y1)); pen.lineTo((x1, y1)); pen.lineTo((x1, y0)); pen.closePath()

    def quad(pen, *p):
        pen.moveTo(p[0]); [pen.lineTo(q) for q in p[1:]]; pen.closePath()

    def add(name, pen, adv, cp):
        glyf[name] = pen.glyph()
        glyf[name].recalcBounds(glyf)
        hmtx[name] = (int(round(adv)), int(getattr(glyf[name], 'xMin', 0)))
        for t in f['cmap'].tables:
            if t.isUnicode():
                t.cmap[cp] = name
        new[name] = cp

    # Dotless j: Orbitron's j minus its dot contour
    pen = TTGlyphPen(None); first = True
    for op, args in outline('j'):
        if op == 'moveTo' and not first:
            break
        first = False
        getattr(pen, op)(*args)
    add('uni0237', pen, hmtx['j'][0], 0x0237)

    def mark_components(base, mark, top_base):
        """Components placing `mark` on `base`; top_base is the glyph used for the mark height."""
        is_cap = base[0].isupper()
        tall = base in ('h',)  # ascender letters that carry a top mark
        lift = lift_cap if is_cap else (lift_asc if tall else 0)
        centre = cx(base)
        if base in ('h', 'l'):
            centre = bounds(base)[0] + stem / 2
        if base in ('dotlessi', 'i'):
            centre = bounds('dotlessi')[0] + stem / 2
        if base == 'uni0237':
            centre = bounds('uni0237')[2] - stem / 2
        top = {'acute': 'acutecomb', 'circumflex': 'uni0302', 'dotaccent': 'uni0307', 'caron': 'uni030C',
               'tilde': 'tildecomb', 'ring': 'uni030A', 'grave': 'gravecomb'}
        if mark in top:
            return [(top[mark], centre, lift)]
        if mark == 'hungarumlaut':
            w = bounds('acutecomb')[2] - bounds('acutecomb')[0]
            return [('acutecomb', centre - w * 0.55, lift), ('acutecomb', centre + w * 0.55, lift)]
        if mark == 'macron':
            b = bounds('macron')
            return [('macron', centre - (b[0] + b[2]) / 2, xh + (bounds('acutecomb')[1] - xh) - b[1] + lift)]
        if mark == 'breve':
            b = bounds('breve')
            return [('breve', centre - (b[0] + b[2]) / 2, xh + (bounds('acutecomb')[1] - xh) - b[1] + lift)]
        if mark == 'ogonek':
            b, bb = bounds('ogonek'), bounds(top_base)
            x = (bb[0] + bb[2]) / 2 - (b[0] + b[2]) / 2 if base in ('I', 'i', 'dotlessi') else bb[2] - b[2] - stem * 0.15
            return [('ogonek', x, -b[3])]
        if mark == 'cedilla':
            b = bounds('uni0327')
            return [('uni0327', centre - (b[0] + b[2]) / 2 + stem * 0.05, 0)]
        if mark == 'commaaccent':
            b = bounds('comma')
            if base == 'g':  # turned comma above
                q = bounds('quoteleft')
                return [('quoteleft', centre - (q[0] + q[2]) / 2, bounds('acutecomb')[1] - q[1])]
            return [('comma', centre - (b[0] + b[2]) / 2, -b[3] - stem * 0.35)]
        raise KeyError(mark)

    for upper, marks in ACCENTED.items():
        for base in (upper, upper.lower()):
            for mark in marks.split():
                if base == 'd' and mark == 'caron':
                    continue  # ď uses the apostrophe form below
                name = f'{base}{mark}'
                glyph_base = {'i': 'dotlessi', 'j': 'uni0237'}.get(base, base)
                if base == 'i' and mark == 'ogonek':
                    glyph_base = 'i'
                try:
                    cp = codepoint(base, mark)
                except KeyError:
                    continue  # e.g. İ has no lowercase counterpart
                comps = [(glyph_base, 0, 0)] + mark_components(glyph_base, mark, glyph_base)
                add(name, pen_with(*comps), hmtx[glyph_base][0], cp)


    # Apostrophe carons: ď ľ ť Ľ
    q = bounds('quoteright'); qw = q[2] - q[0]
    for base, x, top in (('d', bounds('d')[2] + stem * 0.35, asc), ('l', bounds('l')[0] + stem * 1.45, asc),
                         ('t', bounds('t')[2] + stem * 0.2, bounds('t')[3]), ('L', bounds('L')[0] + stem * 1.5, cap)):
        name = {'d': 'dcaron', 'l': 'lcaron', 't': 'tcaron', 'L': 'Lcaron'}[base]
        adv = max(hmtx[base][0], round(x + qw + stem * 0.3)) if base != 'L' else hmtx[base][0]
        add(name, pen_with((base, 0, 0), ('quoteright', x - q[0], top - q[3])), adv,
            {'d': 0x010F, 'l': 0x013E, 't': 0x0165, 'L': 0x013D}[base])

    # Middle dot letters Ŀ ŀ and the centred dot
    p = bounds('period'); pw = p[2] - p[0]
    add('periodcentered', pen_with(('period', 0, (bar_lo + bar_hi) / 2 - (p[1] + p[3]) / 2)), hmtx['period'][0], 0x00B7)
    add('Ldot', pen_with(('L', 0, 0), ('period', bounds('L')[0] + stem * 1.9 - p[0], (bar_lo + bar_hi) / 2 - (p[1] + p[3]) / 2)), hmtx['L'][0], 0x013F)
    lx = bounds('l')[2] + stem * 0.45
    add('ldot', pen_with(('l', 0, 0), ('period', lx - p[0], xh / 2 - (p[1] + p[3]) / 2)), round(lx + pw + stem * 0.4), 0x0140)

    # Ligature-like pairs and borrowed forms
    add('IJ', pen_with(('I', 0, 0), ('J', hmtx['I'][0], 0)), hmtx['I'][0] + hmtx['J'][0], 0x0132)
    jshift = hmtx['i'][0] - bounds('j')[0] + stem * 0.2
    add('ij', pen_with(('i', 0, 0), ('j', jshift, 0)), round(jshift + hmtx['j'][0]), 0x0133)
    add('kgreenlandic', pen_with(('k.sc', 0, 0)), hmtx['k.sc'][0], 0x0138)
    add('napostrophe', pen_with(('quoteright', 0, 0), ('n', hmtx['quoteright'][0], 0)), hmtx['quoteright'][0] + hmtx['n'][0], 0x0149)

    # Stroked letters (overlapping contours fill as one shape)
    def stroked(name, base, cp, draw, adv=None):
        pen = pen_with((base, 0, 0)); draw(pen, bounds(base)); add(name, pen, adv or hmtx[base][0], cp)

    shift = round(stem * 0.55)
    def eth_bar(pen, b, dx=0):
        rect(pen, b[0] + dx - stem * 0.5, bar_lo, b[0] + dx + stem * 1.9, bar_hi)
    pen = pen_with(('D', shift, 0)); eth_bar(pen, bounds('D'), shift); add('Dcroat', pen, hmtx['D'][0] + shift, 0x0110)
    pen = pen_with(('D', shift, 0)); eth_bar(pen, bounds('D'), shift); add('Eth', pen, hmtx['D'][0] + shift, 0x00D0)
    def d_bar(pen, b):
        t = bar * 0.85; mid = (xh + b[3]) / 2
        rect(pen, b[2] - stem * 1.9, mid - t / 2, b[2] + stem * 0.45, mid + t / 2)
    stroked('dcroat', 'd', 0x0111, d_bar, round(hmtx['d'][0] + stem * 0.3))
    stroked('eth', 'd', 0x00F0, d_bar, round(hmtx['d'][0] + stem * 0.3))

    def slash(pen, b):
        pad = stem * 0.35
        # clockwise, so the stroke adds to the ring instead of cutting it
        quad(pen, (b[0] - pad, b[1] - pad), (b[2] + pad - stem * 1.5, b[3] + pad),
             (b[2] + pad, b[3] + pad), (b[0] - pad + stem * 1.5, b[1] - pad))
    stroked('Oslash', 'O', 0x00D8, slash)
    stroked('oslash', 'o', 0x00F8, slash)

    def l_slash(pen, b, top):
        x = b[0] + stem / 2; y = top * 0.47; w = stem * 1.6; h = bar * 0.8
        quad(pen, (x - w, y - h * 1.2), (x - w, y - h * 0.2), (x + w, y + h * 1.2), (x + w, y + h * 0.2))
    stroked('Lslash', 'L', 0x0141, lambda pen, b: l_slash(pen, b, cap))
    stroked('lslash', 'l', 0x0142, lambda pen, b: l_slash(pen, b, asc + xh * 0.1))

    def h_bar(pen, b, top):
        t = bar * 0.8; y = (top + (bar_hi if top == cap else xh)) / 2
        rect(pen, b[0] - stem * 0.4, y - t / 2, (b[2] + stem * 0.4) if top == cap else b[0] + stem * 2.2, y + t / 2)
    stroked('Hbar', 'H', 0x0126, lambda pen, b: h_bar(pen, b, cap))
    stroked('hbar', 'h', 0x0127, lambda pen, b: h_bar(pen, b, asc))

    def t_bar(pen, b, lo, hi):
        t = bar * 0.8; y = (lo + hi) / 2; mid = cx_stem = (b[0] + b[2]) / 2 if hi == cap else b[0] + stem / 2
        rect(pen, mid - stem * 1.5, y - t / 2, mid + stem * 1.5, y + t / 2)
    stroked('Tbar', 'T', 0x0166, lambda pen, b: t_bar(pen, b, 0, cap))
    stroked('tbar', 't', 0x0167, lambda pen, b: t_bar(pen, b, stem, bar_lo * xh / cap + stem))

    def eng(pen, b, top):
        right = b[2]; tail = -stem * 1.6
        rect(pen, right - stem, tail, right, top * 0.2)
        rect(pen, right - stem * 2.6, tail, right, tail + bar)
    stroked('Eng', 'N', 0x014A, lambda pen, b: eng(pen, b, cap))
    stroked('eng', 'n', 0x014B, lambda pen, b: eng(pen, b, xh))

    # Thorn: P with the bowl dropped onto a full-height stem; þ: p with an ascender
    drop = cap * 0.19
    pen = TTGlyphPen(None)
    contours, cur = [], []
    for op, args in outline('P'):
        cur.append((op, args))
        if op == 'closePath':
            contours.append(cur); cur = []
    outer = contours[0]
    stem_r = [a[0] for op, a in outer if op == 'lineTo'][-1][0]
    for ci, contour in enumerate(contours):
        for op, args in contour:
            if op == 'closePath':
                pen.closePath(); continue
            moved = [(x, y - drop) if (ci > 0 or x > stem_r + 1 or (x >= stem_r - 1 and 0 < y < cap - 1)) else (x, y) for x, y in args]
            getattr(pen, op)(*moved)
            if ci == 0 and op == 'lineTo' and args[0][1] >= cap - 2 and args[0][0] <= stem_r:
                pen.lineTo((stem_r, args[0][1])); pen.lineTo((stem_r, args[0][1] - drop))
    add('Thorn', pen, hmtx['P'][0], 0x00DE)
    pb = bounds('p')
    pen = pen_with(('p', 0, 0)); rect(pen, pb[0], xh - stem, pb[0] + stem, asc); add('thorn', pen, hmtx['p'][0], 0x00FE)

    # Long s: f without its crossbar
    pen = TTGlyphPen(None); fx = bounds('f')[2]
    for op, args in outline('f'):
        if op == 'lineTo' and abs(args[0][0] - fx) < 1 and args[0][1] <= xh + 1:
            continue
        getattr(pen, op)(*args) if op != 'closePath' else pen.closePath()
    add('longs', pen, hmtx['f'][0], 0x017F)

    # Punctuation: baseline quotes, guillemets, soft hyphen
    c = bounds('comma'); qr = bounds('quoteright'); qd = bounds('quotedblright')
    add('quotesinglbase', pen_with(('comma', 0, 0)), hmtx['comma'][0], 0x201A)
    add('quotedblbase', pen_with(('quotedblright', 0, c[1] - qd[1])), hmtx['quotedblright'][0], 0x201E)
    add('uni00AD', pen_with(('hyphen', 0, 0)), hmtx['hyphen'][0], 0x00AD)

    def chevron(pen, x_left, pointing):
        """One guillemet stroke pair; pointing -1 = ‹ (tip on the left), +1 = › (tip on the right)."""
        h = xh * 0.3; w = xh * 0.28; t = stem * 1.15; ym = xh * 0.42
        if pointing < 0:
            tip, back = x_left, x_left + w
            quad(pen, (tip, ym), (back, ym + h), (back + t, ym + h), (tip + t, ym))
            quad(pen, (tip, ym), (tip + t, ym), (back + t, ym - h), (back, ym - h))
        else:
            tip, back = x_left + w + t, x_left + t
            quad(pen, (tip, ym), (tip - t, ym), (back - t, ym + h), (back, ym + h))
            quad(pen, (tip, ym), (back, ym - h), (back - t, ym - h), (tip - t, ym))
    lsb = stem * 0.4; w = xh * 0.28 + stem * 1.15
    for name, cp, n, d in (('guilsinglleft', 0x2039, 1, -1), ('guilsinglright', 0x203A, 1, 1),
                           ('guillemotleft', 0x00AB, 2, -1), ('guillemotright', 0x00BB, 2, 1)):
        pen = TTGlyphPen(None)
        for k in range(n):
            chevron(pen, lsb + k * w * 0.72, d)
        add(name, pen, lsb * 2 + w + (n - 1) * w * 0.72, cp)

    order = list(dict.fromkeys(glyf.glyphOrder)); glyf.glyphOrder = order; f.setGlyphOrder(order)
    f['maxp'].numGlyphs = len(order)
    if f['post'].formatType == 2:
        f['post'].formatType = 3.0  # drop glyph names instead of rebuilding format-2 tables

    # Kerning: new letters kern like their base letter
    kern_base = {}
    for name in new:
        comps = getattr(glyf[name], 'components', None) or []
        if comps and comps[0].glyphName in order:
            kern_base[name] = comps[0].glyphName
    for alias, base in (('uni0237', 'j'), ('Thorn', 'P'), ('longs', 'f')):
        kern_base[alias] = base
    for lookup in f['GPOS'].table.LookupList.Lookup:
        if lookup.LookupType != 2:
            continue
        for st in lookup.SubTable:
            if st.Format != 1:
                continue
            firsts = st.Coverage.glyphs
            index = {g: i for i, g in enumerate(firsts)}
            for ps in st.PairSet:
                extra = []
                for rec in ps.PairValueRecord:
                    extra += [(n, rec) for n, b in kern_base.items() if b == rec.SecondGlyph]
                for n, rec in extra:
                    clone = type(rec)(); clone.SecondGlyph = n; clone.Value1 = rec.Value1
                    if hasattr(rec, 'Value2'): clone.Value2 = rec.Value2
                    ps.PairValueRecord.append(clone)
                ps.PairValueRecord.sort(key=lambda r: f.getGlyphID(r.SecondGlyph)); ps.PairValueCount = len(ps.PairValueRecord)
            for n, b in sorted(kern_base.items(), key=lambda kv: f.getGlyphID(kv[0])):
                if b in index:
                    firsts.append(n); st.PairSet.append(st.PairSet[index[b]])
            pairs = sorted(zip(firsts, st.PairSet), key=lambda p: f.getGlyphID(p[0]))
            st.Coverage.glyphs = [p[0] for p in pairs]; st.PairSet = [p[1] for p in pairs]; st.PairSetCount = len(pairs)

    name_t = f['name']
    for rec in list(name_t.names):
        if rec.nameID in (1, 3, 4, 6, 16, 17, 25):
            name_t.removeNames(nameID=rec.nameID)
    name_t.setName('Infracon Display', 1, 3, 1, 0x409)
    name_t.setName(style, 2, 3, 1, 0x409)
    name_t.setName(f'InfraconDisplay-{style};1.1', 3, 3, 1, 0x409)
    name_t.setName(f'Infracon Display {style}', 4, 3, 1, 0x409)
    name_t.setName(f'InfraconDisplay-{style}', 6, 3, 1, 0x409)
    name_t.setName('1.1; modified from Orbitron (SIL OFL 1.1): Latin-1 and Latin Extended-A completed.', 5, 3, 1, 0x409)
    f['OS/2'].usWeightClass = weight
    f['OS/2'].ulUnicodeRange1 |= 1 << 2  # Latin Extended-A

    out = f'{OUT}/InfraconDisplay-{style}.woff2'
    f.flavor = 'woff2'; f.save(out)
    print(out, len(new), 'glyphs added')


build(400, 'Regular')
build(700, 'Bold')
