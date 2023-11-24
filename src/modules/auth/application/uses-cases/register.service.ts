import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../adapters/db/user.repository.prisma';

@Injectable()
export class RegisterService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(username: string, email: string): Promise<void> {
    try {
      // Validación de entrada
      console.log(email);

      if (!username || !email) {
        throw new Error(
          'Nombre de usuario y correo electrónico son requeridos.',
        );
      }

      // Verificar si el usuario ya existe
      const existingUser = await this.userRepository.findUserByUsername(email);
      if (existingUser) {
        throw new Error('El usuario nbmnya existe');
      }

      // Crear una nueva entidad de usuario
      const newUser = {
        username: username,
        email: email,
      };

      // Guardar el nuevo usuario en la base de datos
      await this.userRepository.createUser(newUser);
    } catch (error) {
      // Manejo de excepciones
      //console.error('Error en RegisterService.execute:', error);
      throw error;
    }
  }
}
