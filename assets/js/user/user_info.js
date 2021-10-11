$(function() {
    //从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    //通过form.verify()函数自定义校验规则
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须要1~6个字符之间'
            }
        }
    });
    initUserInfo();
    //初始化用户基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // console.log(res);
                //通过form.val('filter', object)，快速给表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    //重置表单数据
    $('#btnReset').on('click', function(e) {
        //阻止表单默认行为
        e.preventDefault();
        initUserInfo();
    })

    //监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        //阻止默认提交行为
        e.preventDefault();
        //发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')

                //调用父页面index.html的方法，重新渲染用户头像和用户信息
                window.parent.getUserInfo();
            }
        })
    })
})