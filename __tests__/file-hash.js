const fileHash = require('../lib/helpers/file-hash');

describe('File hash', () => {
	it('shoud return non empty string as file has', () => {
		expect(fileHash.scriptHash).toBeTruthy();
		expect(fileHash.styleHash).toBeTruthy();
	});
});
