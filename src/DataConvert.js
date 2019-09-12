export function returnColumns(event) {
  const columns = [
    {
      title: '名前',
      dataIndex: 'name',
      key: 'name'
    },
    ...Object.entries(event.candidateDates).map(entry => ({
      title: entry[1],
      dataIndex: entry[0],
      key: entry[0]
    }))
  ]
  return columns;
}

export function returnDataSource(event) {
  const dataSource = Object.entries(event.participants).map(entry => ({
    key: entry[0],
    name: entry[1].name,
    ...entry[1].votes
  }))
  return dataSource;
}