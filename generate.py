def generate_jsx():
    jsx_code = ""
    for i in range(40):
        jsx_code += '<tr className="row">\n'
        for j in range(40):
            jsx_code += '    <td\n'
            jsx_code += '        className={`cell %s`}\n' % ("fifth-row" if i == 4 else "")
            jsx_code += '        onMouseDown={handleMouseDown(%d, %d)}\n' % (i, j)
            jsx_code += '        onMouseOver={handleMouseOver(%d, %d)}\n' % (i, j)
            jsx_code += '        onMouseLeave={handleMouseLeave}\n'
            jsx_code += '    >\n'
            jsx_code += '        {%d > 0 && %d %% 5 === 0 && (\n' % (i, i)
            jsx_code += '            <div className="fifth-row-border"></div>\n'
            jsx_code += '        )}\n'
            jsx_code += '        {%d > 0 && %d %% 5 === 0 && (\n' % (j, j)
            jsx_code += '            <div className="fifth-col-border"></div>\n'
            jsx_code += '        )}\n'
            jsx_code += '        <div\n'
            jsx_code += '            id="cell"\n'
            jsx_code += '            className={`${determineColored(%d, %d)} ${\n' % (i, j)
            jsx_code += '                selectedCell.row === %d || selectedCell.column === %d\n' % (i, j)
            jsx_code += '                    ? "highlighted"\n'
            jsx_code += '                    : ""}\n'
            jsx_code += '                ${gameRunning ? "" : "hide-cell"} ${gameWon}`}\n'
            jsx_code += '        ></div>\n'
            jsx_code += '    </td>\n'
        jsx_code += '</tr>\n'
    return jsx_code

with open('table.txt', 'w') as file:
    file.write(generate_jsx())
