export class BaseEnums {

  constructor() {}
    static state() {
    return [
      {id: '-1', desc: "همه"},
      {id: 'true', desc: "فعال"},
      {id: 'false', desc: "غیر فعال"},
    ];
  }
  static needToCorrectState() {
    return [
      {id: 'true', desc: "دارد"},
      {id: 'false', desc: "ندارد"},
    ];
  }
  static stateTree() {
    return [
      {id: 'true', desc: "فعال"},
      {id: 'false', desc: "غیر فعال"},
    ];
  }
}

