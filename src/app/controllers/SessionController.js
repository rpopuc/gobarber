import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

/**
 * Controller para gestão de login
 */
class SessionController {
  /**
   * Efetua o login na aplicação
   * Retorna o token JWT de autenticação
   */
  async store(req, res) {
    // Obtém os dados de entrada
    const { email, password } = req.body;

    // Obtém o usuário registrado através do email informado
    const user = await User.findOne({
      where: { email },
    });

    // Caso não exista usuário com o email
    if (!user) {
      // Retorna o erro
      return res.status(401).json({ error: 'User not found' });
    }

    // Verifica se a senha está correta
    if (!(await user.checkPassword(password))) {
      // Em caso de senha inválida, retorna o erro
      return res.status(401).json({ error: 'Password does not match' });
    }

    // Retorna os dados do usuário logado
    // Com o token JWT de autenticação
    const { id, name } = user;
    return res.json({
      // Retorna os dados do usuário
      user: {
        id,
        name,
        email,
      },
      // Gera o token JWT, conforme configuração
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
