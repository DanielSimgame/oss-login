import {ElMessage, ElMessageBox, ElNotification} from "element-plus"

// 通知提示参数预设
export const msgType = {
    SUCCESS: "success",
    WARNING: "warning",
    INFO: "info",
    ERROR: "error"
};
export const msgDuration = {
    SHORT: 3000,
    LONG: 5000
};
export const msgTextAlign = {
    CENTERED: true,
    LEFT: false
};
export const msgShowClose = {
    SHOW: true,
    HIDE: false
};
export const msgPosition = {
    TOP_LEFT: "top-left",
    TOP_RIGHT: "top-right",
    BOTTOM_LEFT: "bottom-left",
    BOTTOM_RIGHT: "bottom-right",
};
export const msgOffset = {
    NO_OFFSET: 0,
    DEFAULT_OFFSET: 200
};

export default {
    /**
     * 顶部消息封装
     * @param {string} message 消息内容
     * @param {Object} args 参数
     * @param {String} args.type 消息类型
     * @param {Boolean} args.centered 消息文本对齐方式
     * @param {Number} args.duration 消息显示时间
     * @param {Boolean} args.showClose 是否显示关闭按钮
     * @param {Number} args.offset 消息偏移量
     * */
    topMsg(message, ...args) {
        ElMessage({
            message: message,
            type: args[0].type || msgType.INFO,
            center: args[0].centered || msgTextAlign.CENTERED,
            showClose: args[0].showClose || msgShowClose.HIDE,
            duration: args[0].duration || msgDuration.SHORT,
            offset: args[0].offset || msgOffset.DEFAULT_OFFSET
        })
    },
    /**
     * 顶部错误消息封装
     * @param {string} message 消息内容
     * */
    error(message= '未定义的错误信息') {
        ElMessage({
            message,
            type: msgType.ERROR,
            center: msgTextAlign.CENTERED,
            showClose: msgShowClose.HIDE,
            duration: msgDuration.SHORT,
        })
    },
    /**
     * 消息弹框封装
     * @param {String} message 提示信息
     * @param {String} title 标题
     * @param {String} type 消息类型
     * @param {Boolean} showCancel 是否显示取消按钮
     * @param {Boolean} showConfirm 是否显示确认按钮
     * @param {Function} confirmCallback 确认回调
     * @param {Function} cancelCallback 取消回调
     * */
    msgBox(message, title, type, showCancel, showConfirm, confirmCallback = () => {
        console.log('未定义确认回调');
    }, cancelCallback = () => {
        console.log('未定义取消回调');
    }) {
        ElMessageBox({
            title: title,
            message: message,
            showCancelButton: showCancel,
            showConfirmButton: showConfirm,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: type,
            beforeClose: (action, instance) => {
                if (action !== 'confirm') {
                    instance.confirmButtonLoading = true
                    instance.confirmButtonText = '加载中...'
                    setTimeout(() => {
                        cancelCallback()
                        setTimeout(() => {
                            instance.confirmButtonLoading = false
                        }, 300)
                    }, msgDuration.SHORT)
                } else {
                    confirmCallback()
                }
            },
        }).then(action => action)
    },
    /**
     * 消息通知封装
     * @param {String} message 提示信息
     * @param {Object} args 参数
     * @param {String} args.title 提示标题
     * @param {String | null} args.type 消息类型
     * @param {String | null} args.position 通知展示位置
     * @param {Number | null} args.offset 通知偏移量，默认为0，单位为px
     * @param {Number | null} args.duration 通知显示时间，默认为3000ms
     * @param {Boolean | null} args.HTML 是否在message中使用html标签（！谨慎使用，可能会导致不可预见情况！）
     * */
    notify(message, ...args) {
        ElNotification({
            title: args[0].title || '提示',
            message: message,
            type: args[0].type || msgType.INFO,
            position: args[0].position || msgPosition.TOP_RIGHT,
            duration: args[0].duration || msgDuration.SHORT,
            // offset: args[0].offset || msgOffset.NO_OFFSET,
            dangerouslyUseHTMLString: args[0].HTML || false,
        })
    }
}
