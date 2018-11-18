export const registerAnonymousTest = (store) => {
    describe('register anonymous user', () => {
        it('created an anonymous user', async () => {
            store.dispatch('c3s/user/generateAnon').then(u => {
                expect(u).toBeInstanceOf(Object);
                expect(u.status).toBe(201);
                expect.objectContaining({
                    'api_key': expect.any(String),
                    'username': expect.any(String),
                    'id': expect.any(String)
                });
            });
        });
    });
}

export const registerUserTest = (store, user) => {
    describe('register specified user', () => {
        it('created a user with specified credentials', async () => {
            store.dispatch('c3s/user/register', user).then(u => {
                expect(u).toBeInstanceOf(Object);
                expect(u.status).toBe(201);
                expect.objectContaining({
                    'api_key': expect.any(String),
                    'username': expect.any(String),
                    'id': expect.any(String)
                });
            });
        });
    });
}
