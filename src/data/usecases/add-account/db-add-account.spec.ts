import { DbAddACcount } from "./db-add-account";

describe("DbAddAccountUsecase", () => {
	test("Should call encrypter with correct password", async () => {
		class EncrypterStub {
			async encrypt(value: string): Promise<string> {
				return new Promise((resolve) => resolve("hashed_value"));
			}
		}

		const encrypterStub = new EncrypterStub();

		const sut = new DbAddACcount(encrypterStub);

		const encryptSpy = jest.spyOn(encrypterStub, "encrypt");
		const accountData = {
			name: "valid_name",
			email: "valid_email",
			password: "valid_password",
		};
		await sut.add(accountData);
		expect(encryptSpy).toHaveBeenCalledWith("valid_password");
	});
});
