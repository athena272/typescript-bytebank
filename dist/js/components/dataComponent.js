import { formatarData } from "../utils/formatter.js";
import { FormatoData } from "../types/Data.js";
import { conta } from "../types/Conta.js";
const elementoDataAcesso = document.querySelector(".block-saldo time");
renderData();
function renderData() {
    const dataAcesso = conta.getDataAcesso();
    if (elementoDataAcesso !== null) {
        elementoDataAcesso.textContent = formatarData(dataAcesso, FormatoData.DIA_SEMANA_DIA_MES_ANO);
    }
}
const DataComponent = {
    updateInfo() {
        renderData();
    }
};
export default DataComponent;
