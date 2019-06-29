// Importa a biblioteca de validação
// Importa o model do Usuário
import User from '../models/User';
import File from '../models/File';

/**
 * Controller para gestão de dados de usuários
 */
class ProviderController {
  /**
   * Registra um novo usuário
   */
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(providers);
  }
}

export default new ProviderController();
