export default class DataGrid {

    #tBodyElement;
    #keys;

    constructor(parentID, columns) {
        // columns - array of objects {field: <name of key>, headerName: <column name>}
        this.#keys = columns.map(column => column.field);
        this.#buildTableHeader(parentID, columns.map(c => c.headerName))
    }

    async fillData(rowsData) {
        this.#tBodyElement.innerHTML = rowsData.map(rd => this.#getRow(rd)).join('');
    }

    #getRow(obj) {
        return `<tr>
                   ${this.#keys.map(key => `<td>${obj[key]}</td>`).join('')}
                </tr>`
    }

    insertRow(obj) {
        this.#tBodyElement.innerHTML += this.#getRow(obj);
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