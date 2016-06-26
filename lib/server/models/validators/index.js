const validators = {
  required: {
    validator: function(v) {
      return v !== '';
    },
    message: 'Thông tin bắt buộc'
  },
  phone: {
    validator: function(v) {
      return /\d{3}-\d{3}-\d{4}/.test(v);
    },
    message: '"{VALUE}" khong phai la so dien thoai'
  },
  email: {
    validator: function(v) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(v);
    },
    message: '"{VALUE} khong phai la dia chi email'
  },
};

export default validators;
