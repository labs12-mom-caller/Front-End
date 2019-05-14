exports.handler = async function(admin, snapshot, sgMail) {
  const data = snapshot.data();
  try {
    await admin.auth().createUser({
      email: data.email,
      emailVerified: false,
      password: Math.random()
        .toString(36)
        .slice(-8),
      displayName: data.displayName,
      photoURL: data.photoURL,
      disabled: false,
      uid: snapshot.id,
    });

    const passwordLink = await admin
      .auth()
      .generatePasswordResetLink(data.email);

    const msg = {
      personalizations: [
        {
          to: [
            {
              email: data.email,
              name: data.displayName,
            },
          ],
          dynamic_template_data: {
            url: passwordLink,
          },
          subject: 'A friend or loved one has signed you up for ReCaller!',
        },
      ],
      from: {
        email: 'labsrecaller@gmail.com',
        name: 'ReCaller Team',
      },
      reply_to: {
        email: 'labsrecaller@gmail.com',
        name: 'ReCaller',
      },
      template_id: 'd-6077c121962b439f983a559b6f3a57f8',
    };
    sgMail.send(msg);
  } catch (e) {
    throw e;
  }
};
