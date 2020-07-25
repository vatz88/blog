const fileHash = require('../lib/helpers/file-hash');

describe('File hash', () => {
	it('should return non empty string as file hash', () => {
		expect(fileHash.styleHash).toBeTruthy();
		expect(fileHash.scriptHash).toBeTruthy();
		expect(fileHash.scriptHash).not.toEqual(fileHash.styleHash);
	});
});
