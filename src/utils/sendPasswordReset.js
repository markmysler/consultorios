import { sendPasswordResetEmail } from "firebase/auth";

export const sendResetEmail = async (
	auth,
	router,
	email,
	actionCodeSettings,
	redirectTo
) => {
	await sendPasswordResetEmail(auth, email, actionCodeSettings)
		.then(() => {
			router.push({
				path: redirectTo,
				query: {
					email: email,
				},
			});
		})
		.catch((error) => {
			console.log(error);
		});
};
