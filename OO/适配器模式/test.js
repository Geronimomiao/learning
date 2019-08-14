var getGuanggongCity = function () {
  // 找到的数据
  var guangdongCity = [
    {
      name: 'shenzhen',
      id: 11
    },
    {
      name: 'guangzhou',
      id: 12
    }
  ];

  return guangdongCity;
};

// 实际要求的数据
// var guangdongCity = {
//   shenzhen: 11,
//   guangzhou: 12,
//   zhuhai: 13
// };

var addressAdapter = function (olderAddressfn) {
  var address = {},
    oldAddress = olderAddressfn();

  for (var i = 0, c; c = oldAddress[i++]; ) {
    address[c.name] = c.id;
  }

  return function () {
    return address;
  };
};

var render = function (fn) {
  console.log('开始渲染广东省地图');
  document.write(JSON.stringify(fn()));
};

// render(getGuanggongCity); // 先前
render(addressAdapter(getGuanggongCity)); // 装适配器后





