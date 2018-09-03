
function createHTML(f, file) {
    const icons = f.svg.defs[0].font[0].glyph;
    const font = f.svg.defs[0].font[0].$.id;
    let html = `<html>
<style>
@font-face {
    font-family: ${font};
    src: url("${file}.ttf");
    -fs-pdf-font-embed: embed;
    -fs-pdf-font-encoding: Identity-H;
}
h2 {
    font-weight: normal;
    font-family: sans-serif;
    color: #1c7d06;
    font-size: 1rem;
}
.is {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    align-items: center;
}
.container {
    width: 120px;
    margin: 2rem;
}

i {
    font-family: '${font}' !important;
    font-style: normal;
}
i:before {
    font-size:2rem;
}
`;
    icons.forEach(m => {
        html += `
.${m.$['glyph-name']}:before {
    content: "${m.$.unicode}";
}`

    });

    html += `</style><body><h1>${font}</h1><div class='is'>`

    icons.forEach(m => {
        html += `
<div class="container">
<h2>${m.$['glyph-name']}<br/>${m.$.unicode}</h2>
<i class="${m.$['glyph-name']}"></i>
</div>`

    });
    html+= `</div></body></html>`;
    return html;
}

module.exports = createHTML;