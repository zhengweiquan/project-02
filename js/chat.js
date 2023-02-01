$(function () {
    //    发送按钮事件
    $('#btnSend').on('click', function () {
        var text = $('#ipt').val().trim();
        if (text.length <= 0) {
            $('#ipt').val('');
        } else {
            // 给页面追加dom  就是聊天信息
            $('#talk_list').append(' <li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>');
            $('#ipt').val('');  //清空输入框
            resetui();//每次追加完都要调用函数进行页面滚动
            // 调用机器人回答函数
            getMsg(text);
            resetui();
        }
    })
    // 机器人回答
    // 封装一个函数
    function getMsg(text) {
        $.ajax({
            methods: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text,
            },
            success: function (res) {
                // 把机器人返回的内容放到页面中
                var msg = res.data.info.text;
                // console.log(msg);
                // 添加到你dom里面
                $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span></li>');
            resetui();
            getVoice(msg);

            }
        })
    }
    // 封装函数播放音频
    function getVoice(msg) {
        $.ajax({
            methods: 'get',
            url:'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: msg
            },
            success: function(res) {
                if(res.status === 200) {
                    // 获取属性值src 并修改为res.voiceUrl
                    $('#voice').attr('src',res.voiceUrl)
                    console.log(res);
                }
            resetui();
            }

        })
    }
    // 键盘事件
    $('#ipt').on('keyup',function(e) {
    //    console.log(e.keyCode);这个可以获得加你盘的ascll码值
    if(e.keyCode === 13) {  //这里也可以 e.key == 'Enter'`
        $('#btnSend').click();//模拟键盘按下
    }
    })
})