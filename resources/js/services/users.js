import instance from './config';

export async function createNewUserService(payload) {
    const createNewUser = await instance.post('/register', payload);
    return createNewUser;
}

export async function logInService(credentials) {
    const logIn = await instance.post('/login', credentials);
    return logIn;
}

export async function sendResetPasswordLinkService(email) {
    const sendResetPasswordLink = await instance.post('/send-reset-email', email);
    return sendResetPasswordLink;
}

export async function resetPasswordService(payload) {
    const resetPassword = await instance.patch('/users/pass-reset', payload);
    return resetPassword;
}

export async function changePasswordService(payload) {
    const data = {
        password: payload.new_password,
        old_password: payload.old_password
    };

    const UserChangePasswordModal = await instance.patch(`/users/${payload.user_id}/pass`, data);
    return UserChangePasswordModal;
}
