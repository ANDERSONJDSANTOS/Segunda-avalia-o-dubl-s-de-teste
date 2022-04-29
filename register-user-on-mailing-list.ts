import { EmailNotificationService } from "./email-notification-service";
import { UserRepository } from "./user-repository";

export type RegisterUserOnMailingListInput = {
  name: string
  email: string
}

export class RegisterUserOnMailingList {
  constructor (
    private readonly userRepository: UserRepository = new UserRepository(),
    private readonly emailNotificationService: EmailNotificationService = new EmailNotificationService()
  ) {}

  execute (input: RegisterUserOnMailingListInput): void {
    const user = this.userRepository.findBy(input.email)
    if (user) {
      throw new Error('Usuário já cadastrado')
    }

    const isUserCreated = this.userRepository.add({
      name: input.name,
      email: input.email
    })
    if (!isUserCreated) {
      throw new Error('Usupario não cadastrado na base') 
    }

    const isNotificationSent = this.emailNotificationService.send({
      to: input.email,
      subject: 'Welcome to the mailing list',
      body: 'You have been registered to the mailing list'
    })
    if(!isNotificationSent) {
      throw new Error('Notificação por email não enviada')
    }
  }
}