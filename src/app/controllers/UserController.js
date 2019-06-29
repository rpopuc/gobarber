import User from '../models/User';

/**
 * Controller para gestão de dados de usuários
 */
class UserController {
  /**
   * Registra um novo usuário
   */
  async store(req, res) {
    // Verifica se já existe um usuário com o email informado
    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    // Caso exista, bloqueia o registro
    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    // Efetua o registro dos dados na base
    const { id, name, email, provider } = await User.create(req.body);

    // Retorna os dados do usuário recém criado
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  /**
   * Efetua a alteração dos dados do usuário
   */
  async update(req, res) {
    // Obtém os dados de entrada
    const { email, oldPassword } = req.body;

    // Obtém o usuário da base de dados
    const user = await User.findByPk(req.userId);

    // Verifica se a alteração
    // implica em um email duplicado
    if (email !== user.email) {
      // Verifica se existe um usuário com o mesmo email
      const userExists = await User.findOne({
        where: { email },
      });

      // Se existir, bloqueia a alteração
      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    // Se for solicitada a alteração de senha...
    // ...Verifica se a senha atual está correta
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    // Efetua a alteração dos dados
    await user.update(req.body);

    // Retorna os dados do usuário
    const { id, name, provider } = user;
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
