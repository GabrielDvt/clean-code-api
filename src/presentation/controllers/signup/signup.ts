import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest, serverError } from "./../../helpers/httpHelper";
import {
	Controller,
	EmailValidator,
	AddAccount,
	HttpRequest,
	HttpResponse,
} from "./signup-protocols";

export class SignUpController implements Controller {
	private readonly emailValidator: EmailValidator;
	private readonly addAccount: AddAccount;

	constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
		this.emailValidator = emailValidator;
		this.addAccount = addAccount;
	}

	handle(httpRequest: HttpRequest): HttpResponse {
		try {
			const requiredFields = [
				"name",
				"email",
				"password",
				"passwordConfirmation",
			];
			const { name, email, password, passwordConfirmation } = httpRequest.body;
			for (const field of requiredFields) {
				if (!httpRequest.body[field]) {
					return badRequest(new MissingParamError(field));
				}
			}
			if (password !== passwordConfirmation)
				return badRequest(new InvalidParamError("passwordConfirmation"));
			const isEmailValid = this.emailValidator.isValid(email);
			if (!isEmailValid) return badRequest(new InvalidParamError("email"));
			this.addAccount.add({
				name,
				email,
				password,
			});
			return {
				body: "",
				statusCode: 200,
			};
		} catch (e) {
			return serverError();
		}
	}
}
