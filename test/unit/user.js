export const registerAnonymousTest = (store) => {
    describe('registerAnon', () => {
        it('created an anonymous user', async () => {
            store.dispatch('c3s/user/generateAnon').then(u => {
                expect(u).toBeInstanceOf(Object);
                expect.objectContaining({
                    'api_key': expect.any(String),
                    'username': expect.any(String),
                    'id': expect.any(String)
                });
            });
        });
    });
}
