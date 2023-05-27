export default class DataGrid {

    #tBodyElement;
    #keys;

    constructor(parentID, columns) {
        // columns - array of objects {field: <name of key>, headerName: <column name>}
        this.#keys = columns.map(column => column.field);
        this.#buildTableHeader(parentID, columns.map(c => c.headerName))
    }

    filldata(rowsData) {
        let str = rowsData.map(row => `<tr>${this.#keys.map(element => `<td>${row[element]}</td>`).join('')}</tr>`).join('');
        this.#tBodyElement.innerHTML = str;
    }


    #buildTableHeader(parentID, columnNames) {
        const tableSectionElement = document.getElementById(parentID);
        tableSectionElement.innerHTML =
            `<table>
            <thead>
                <tr>
                    ${columnNames.map(headerName => `<th>${headerName}</th>`).join('')}
                </tr>
            </thead>
            <tbody id="${parentID}-table"></tbody>
        </table>`
        this.#tBodyElement = document.getElementById(parentID + "-table");
    }
}