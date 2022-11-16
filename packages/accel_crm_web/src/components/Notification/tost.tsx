import { Button, notification, Space } from 'antd';



export const fireNotification = (type, msg, disc): any => async (dispatch) => {
    notification[type]({
        message: msg,
        description: disc,
        placement: 'bottomLeft'
    });
};
