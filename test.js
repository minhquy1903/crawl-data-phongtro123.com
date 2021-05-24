// const timeStart = new Date().setFullYear(2021, 5, 22);
// const x = new Date().setDate(22, 05, 2021);
// console.log(x); // Apr 30 2000

const x = parseInt('thoa');

console.log(typeof x);

// const timeEnd = new Date(timeStart);
// timeEnd.setDate(timeStart.getDate() + 15);
// console.log(timeEnd); // May 01 2000

// const getQuery = (obj) => {
//   return Object.entries(obj)
//     .filter((item) => {
//       return item[1];
//     })
//     .reduce((a, b) => {
//       console.log('a', a);
//       console.log('b', b);
//       return { ...a, [b[0]]: b[1] };
//     });
// };

// const filterInfo = {
//   'accommodation.address.province': 'kdhs',
//   'accommodation.address.district': 'fdskfd',
//   'accommodation.address.ward': 'ward',
//   'accommodation.type': '',
//   'accommodation.area': null,
//   'accommodation.retail': 'retailRange',
// };

// // console.log(getQuery(filterInfo));

// a = ['accommodation.address.province', 'kdhs'];
// b = ['accommodation.address.district', 'fdskfd'];
// const c = { ...a };
// console.log(c);

// const typeAccommdation = Math.floor(Math.random() * 4) + 1;
// console.log(typeAccommdation);
