import {returnColumns, returnDataSource} from "./DataConvert";

const event = {
  eventName: "新年会",
  description: "盛り上がってまいりました",
  candidateDates: [ "8/7(月) 20:00～", "8/8(火) 20:00～", "8/9(水) 21:00～" ],
  participants: {
    part_001: {
      name: "一郎",
      votes: [ "○", "△", "×" ]
    },
    part_002: {
      name: "次郎",
      votes: ["○", "○", "×"]
    }
  }
}

const expectedColumns = [
  {
    title: '名前',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: '8/7(月) 20:00～',
    dataIndex: "0",
    key: "0"
  }, {
    title: '8/8(火) 20:00～',
    dataIndex: "1",
    key: "1"
  }, {
    title: '8/9(水) 21:00～',
    dataIndex: "2",
    key: "2"
  }
];

const expectedDataSource = [
  {
    key: "part_001",
    name: '一郎',
    '0': '○',
    '1': '△',
    '2': '×'
  }, {
    key: "part_002",
    name: '次郎',
    '0': '○',
    '1': '○',
    '2': '×'
  }
];

describe("returnColumns", () => {
  it("カラム表示用にJSONを作り直す", () => {
    expect(returnColumns(event)).toEqual(expectedColumns);
  });
});

describe("returnDataSource", () => {
  it("データ表示用にJSONを作り直す", () => {
    expect(returnDataSource(event)).toEqual(expectedDataSource)
  })
})