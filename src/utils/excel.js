import XLSX from "xlsx";
import { nanoid } from "nanoid";
import { foodTypeEnum, seasonEnum, nameTransMap } from "@/views/enum";

/**
 * @function 导出Excel文件
 * @param {Object} json 服务端发过来的数据
 * @param {String} name 导出Excel文件名字
 */
function exportExcel(json, name) {
  /* convert state to workbook */
  var data = new Array();
  var keyArray = new Array();
  console.log(json, "json");
  // 行
  for (const key1 in json) {
    if (Object.prototype.hasOwnProperty.call(json, key1)) {
      const element = json[key1];
      var rowDataArray = new Array();
      // 列
      for (const key2 in element) {
        if (Object.prototype.hasOwnProperty.call(element, key2)) {
          switch (key2) {
            case "foodType":
              rowDataArray.push(_foodTypeTrans(element[key2], "label"));
              break;
            case "season":
              rowDataArray.push(_seasonTrans(element[key2], "label"));
              break;
            default:
              rowDataArray.push(element[key2]);
              break;
          }
          if (keyArray.length < _getLength(element)) {
            keyArray.push(nameTransMap.get(key2));
          }
        }
      }
      data.push(rowDataArray);
    }
  }
  data.splice(0, 0, keyArray);
  console.log(data, "data");
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
  /* generate file and send to client */
  XLSX.writeFile(wb, name + ".xlsx");
}

/**
 * @function 导入excel文件并返回数据
 * @param {function} 回调函数，返回数据data
 */
function importExcel(callback) {
  var inputObj = document.createElement("input");
  inputObj.setAttribute("id", "file");
  inputObj.setAttribute("type", "file");
  inputObj.setAttribute("name", "file");
  inputObj.setAttribute("style", "visibility:hidden");
  inputObj.setAttribute("accept", ".xlsx,.xls,.csv");
  inputObj.addEventListener("change", (evt) => {
    const files = evt.target.files;
    if (files && files[0])
      _file(files[0], (data) => {
        callback(data);
      });
  });
  document.body.appendChild(inputObj);
  inputObj.value;
  inputObj.click();
}

/**
 * @description: 处理文件
 * @param {Object} file 文件对象
 * @param {function} callback 回调函数
 */
function _file(file, callback) {
  const make_cols = (refstr) =>
    Array(XLSX.utils.decode_range(refstr).e.c + 1)
      .fill(0)
      .map((x, i) => ({
        name: XLSX.utils.encode_col(i),
        key: i,
      }));

  /* Boilerplate to set up FileReader */
  const reader = new FileReader();
  reader.onload = (e) => {
    /* Parse data */
    const bstr = e.target.result;
    const wb = XLSX.read(bstr, {
      type: "binary",
    });
    /* Get first worksheet */
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    // 数据处理
    const data = XLSX.utils.sheet_to_json(ws);
    console.log(data, "_file data");
    let handleData = [];
    data.forEach((item) => {
      let obj = {};
      obj.foodName = item["菜品名称"];
      obj.foodType = _foodTypeTrans(_strtoArray(item["菜品类型"]));
      obj.season = _seasonTrans(_strtoArray(item["季节"]));
      obj.desc = item["描述"];

      obj.createdBy = "admin";
      obj.createdTime = new Date().Format("yyyy-MM-dd HH:mm:ss");
      obj.updatedTime = new Date().Format("yyyy-MM-dd HH:mm:ss");
      obj.foodId = nanoid();

      handleData.push(obj);
    });
    /* Update state */
    callback(handleData, make_cols(ws["!ref"]));
  };
  reader.readAsBinaryString(file);
}

/**
 * @function 获取map的长度
 * @param {Object} obj map对象
 * @return {Number} map的长度
 */
function _getLength(obj) {
  var count = 0;
  for (var i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      count++;
    }
  }
  return count;
}

/**
 * @function 字符串转数组
 * @param {String}
 * @return {Array} 按中英文逗号分割后的数组
 */
function _strtoArray(str) {
  if (typeof str === "string") {
    let temp = str.replace(/\s+/g, "");
    return temp.split(/,|，/); // 按中英文逗号分割
  }
}

/**
 * @function 食物类型枚举转化
 * @param {Array} 中文类型数组
 * @return {Array} 英文类型数组
 */
function _foodTypeTrans(arr, target = "value") {
  const compare = target === "value" ? "label" : "value";
  return arr.map((item) => {
    return foodTypeEnum.find((e) => e[compare] === item)[target];
  });
}

/**
 * @function 季节类型枚举转化
 * @param {Array} 中文类型数组
 * @return {Array} 英文类型数组
 */
function _seasonTrans(arr, target = "value") {
  const compare = target === "value" ? "label" : "value";
  return arr.map((item) => {
    return seasonEnum.find((e) => e[compare] === item)[target];
  });
}

export default {
  exportExcel,
  importExcel,
};
