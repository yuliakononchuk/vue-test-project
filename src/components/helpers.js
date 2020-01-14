export function sortWithType(sortedData, isNumeric, orderIsAsc, sortByItem) {
    return isNumeric ? sortNumeric(sortedData, orderIsAsc, sortByItem) : sortAlpha(sortedData, orderIsAsc, sortByItem)
}

function sortAlpha(sortedData, orderIsAsc, sortByItem) {
    return sortedData.sort((a, b) => {
    const A = a[sortByItem];
    const B = b[sortByItem];
    const aAfterB = (A > B && orderIsAsc) || (A < B && !orderIsAsc)
    return aAfterB ? 1 : -1;
    })
  }

function sortNumeric(sortedData, orderIsAsc, sortByItem) {
    return sortedData.sort( (a,b) => {
        const A = a[sortByItem];
        const B = b[sortByItem];
        return orderIsAsc ? B - A : A - B
    })
  }