// const unselectColor = "#f7df1e";
const selectColor = "black";

export default class DataGrid {

    #tBodyElement;
    #keys;
    #callbackFn;
    #selectedRow;

    constructor(parentID, columns) {
        // columns - array of objects {field: <name of key>, headerName: <column name>}
        this.#keys = columns.map(column => column.field);
        this.#buildTableHeader(parentID, columns.map(c => c.headerName));
    }

    async fillData(rowsData) {
        this.#tBodyElement.innerHTML = rowsData.map(rd => this.#getRow(rd)).join('');
    }

    #getRow(obj) {
        return `<tr>
                   ${this.#keys.map(key => `<td>${obj[key]}</td>`).join('')}
                </tr>`
    }

    addHandler(handler) {
        this.#callbackFn = handler;
        this.#addListeners();
    }

    selectRow(nRow){
        if(this.#selectedRow != undefined){
            this.#deselectRow();
        }
        const element = this.#tBodyElement.getElementsByTagName("tr")[nRow];
        let hasChanged = false;
        if (this.#selectedRow != nRow){
            if (element.style.backgroundColor != selectColor){
                element.style.backgroundColor = selectColor;
                hasChanged = true;
            } else {            
                element.style.backgroundColor = '';
            }
            this.#selectedRow = nRow;
        } else {
            this.#selectedRow = undefined;
        }
        
        return hasChanged;
    }

    #deselectRow(){
        this.#tBodyElement.getElementsByTagName("tr")[this.#selectedRow].style.backgroundColor = '';
    }

    insertRow(obj) {
        this.#tBodyElement.innerHTML += this.#getRow(obj);
    }

    deleteRow(nRow) {
        this.#tBodyElement.deleteRow(nRow);
    }

    editRow(obj, nRow){
        this.#tBodyElement.getElementsByTagName("tr")[nRow].innerHTML = this.#getRow(obj);
    }

    #addListeners() {
        this.#tBodyElement.childNodes.forEach((row, index) => {
            row.addEventListener("click", this.#handler.bind(this, index))
        })
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

    async #handler(index) {

        // if (this.#activeIndex == undefined || index != this.#activeIndex) {

        //     if (this.#activeIndex != undefined) {
        //         this.#Buttons[this.#activeIndex].classList.remove(ACTIVE);
        //         this.#sectionElements[this.#activeIndex].hidden = true;
        //     }
        await this.#callbackFn(index);

        //     this.#sectionElements[index].hidden = false;
        //     this.#Buttons[index].classList.add(ACTIVE);
        //     this.#activeIndex = index;
        // }

    }

    async getID(nRow){
        const indexOfColumn = this.#keys.indexOf('id');
        const ID = +this.#tBodyElement.getElementsByTagName("tr")[nRow].getElementsByTagName("td")[indexOfColumn].innerText;
        return ID;
    }
}