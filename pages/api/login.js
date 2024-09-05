import db from '../../lib/db';
import { z } from 'zod';

// Schéma de validation avec Zod
const schema = z.object({
  login: z
    .string()
    .nonempty({ message: 'Le login ne peut pas être vide' })
    .regex(/^[a-zA-Z]+$/, 'Le login doit contenir uniquement des lettres'),
  password: z
    .string()
    .nonempty({ message: 'Le mot de passe ne peut pas être vide' }),
});

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    const { login, password } = req.body;

    // Validation de la saisie avec Zod
    const validationResult = schema.safeParse({ login, password });

    if (!validationResult.success) {
      // Si la validation échoue, retourner un objet d'erreurs au frontend
      const errors = validationResult.error.errors.reduce((acc, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {});
      return res.status(400).json({ errors });
    }

    try {
      // Utilisation de crypt() dans la requête SQL pour comparer le mot de passe entré avec le mot de passe haché
      const query = `SELECT * FROM utilisateurs WHERE login = $1 AND password = crypt($2, password)`;
      const values = [login, password];
      const result = await db.query(query, values);

      if (result.rows.length > 0) {
        // Utilisateur trouvé
        return res.status(200).json({ message: 'Connexion réussie!' });
      } else {
        // Utilisateur non trouvé
        return res.status(401).json({ message: 'Login ou mot de passe incorrect' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur du serveur' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
