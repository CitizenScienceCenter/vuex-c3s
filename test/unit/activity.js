export const createActivityTest = (store) => {
    describe('activity creation', () => {
        let project;
        let user;

        it('creates an anonymous user to login as', async (done) => {
            //TODO specify user in config file
            store.dispatch('c3s/user/generateAnon').then(u => {
                expect(u).toBeInstanceOf(Object);
                expect.objectContaining({
                    'api_key': expect.any(String),
                    'username': expect.any(String),
                    'id': expect.any(String)
                });
                user = u;
                done();
            });
        })

        it('should create a project to hold the activity', async (done) => {
            store.dispatch('c3s/project/createProject', {
                "name": "activity project",
                "description": "activity project"
            }).then(p => {
                expect(p.status).toBe(401);
                done()
            });
        });
        it('should create an activity with the provided credentials', (done) => {
            const act_dict = {
                "name": "Test Activity",
                "description": "Test Activity",
                "platform": "Both",
                "part_of": "dhjkdfhkjdfh"
            };
            store.dispatch('c3s/activity/createActivity', act_dict).then(a => {
                expect(a.status).toBe(401);
                done()
            });
        })
    });
}
