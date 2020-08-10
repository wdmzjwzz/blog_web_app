// cookie获取

module.exports = {
    get: function (c_name) {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + '=')
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1
                var c_end = document.cookie.indexOf(';', c_start)
                if (c_end == -1) c_end = document.cookie.length
                return document.cookie.substring(c_start, c_end)
            }
        }
        return ''
    },
    set: function (name, value) {
        this.del(name)
        var Days = 30
        var exp = new Date()
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
        document.cookie = name + '=' + value + ';expires=' + exp.toGMTString() + ";path=/";
    },

    del: function (name) {
        var exp = new Date()
        exp.setTime(exp.getTime() + (-1 * 24 * 60 * 60 * 1000))
        var cval = this.get(name)
        document.cookie = name + '=' + cval + '; expires=' + exp.toGMTString() + ";path=/";
    }
}