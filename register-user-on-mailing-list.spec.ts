import { RegisterUserOnMailingList } from '../src/register-user-on-mailing-list';
import { UserRepository } from '../src/user-repository';
import { EmailNotificationService } from '../src/email-notification-service';

describe('RegisterUserOnMailingList Class', function(){
  let userRepository: UserRepository
  let emailNotificationService: EmailNotificationService
  let sut: RegisterUserOnMailingList

  beforeEach(function(){
    userRepository = new UserRepository()
    emailNotificationService= new EmailNotificationService()
    sut = new RegisterUserOnMailingList(
      userRepository,
      emailNotificationService
    )

  })

  test(" Retornar um erro caso o usuario não exista", function(){
    jest.spyOn(userRepository,'findBy' ).mockImplementationOnce(function(){
      return {
        email: "anderson@gmail.com",
        name: 'Anderson'
      }
    })
    expect(()=>{
      sut.execute(
        {
          name: "Anderson",
          email: "anderson@gmail.com",
        }
      ) 
      }).toThrow('Usuário já cadastrado')   
       
  })
  test("Retornar um erro caso o usuario não seja cadastrado na base", function(){
    let add = jest.spyOn(userRepository, 'add');
    add.mockReturnValue(false)
    expect(()=>{
      sut.execute(
        {
          name: "Anderson",
          email: "anderson@gmail.com",
        }
      ) 
    }).toThrow('Usupario não cadastrado na base')
  })
  test("Retornar um erro caso a notificação por e-mail não tenha sido enviada", function(){
    let send = jest.spyOn(emailNotificationService, 'send');
    send.mockReturnValue(false);
    
    let add = jest.spyOn(userRepository, 'add');
    add.mockReturnValue(true)
    expect(()=>{
      sut.execute(
        {
          name: "Anderson",
          email: "anderson@gmail.com",
        }
      ) 
    }).toThrow('Notificação por email não enviada')

  })
  test('Não lançar erro caso as tres funções anteriores derem certo', function(){
    jest.spyOn(userRepository,'findBy' ).mockImplementationOnce(function(){
      return null
    })
    let send = jest.spyOn(emailNotificationService, 'send');
    send.mockReturnValue(true);
    
    let add = jest.spyOn(userRepository, 'add');
    add.mockReturnValue(true)
    expect(()=>{
      sut.execute(
        {
          name: "Anderson",
          email: "anderson@gmail.com",
        }
      ) 
    }).not.toThrow()



  })

})






































/*describe('LoadTodosList', function () {

    let registerUserOnMailingList: RegisterUserOnMailingList
    let userRepository: UserRepository
    let emailNotificationService: EmailNotificationService

    beforeEach(()=>{
      registerUserOnMailingList = new RegisterUserOnMailingList(
        userRepository  = new UserRepository()
      );
     
      emailNotificationService = new EmailNotificationService();
    })

    it('Deve lançar um erro se o email já está cadastrado.', function () { // 1
        let findBy = jest.spyOn(userRepository, 'findBy');
        //                    nome do objeto    nome do método
        findBy.mockReturnValue( // executa, roda com a mudança
          {
            name: "Anderson",
            email: "anderson@gmail.com",
          }
        );
       
        expect(()=>{
          registerUserOnMailingList.execute(
            {
              name: "Anderson",
              email: "anderson@gmail.com",
            }
          ) 
         }).toThrow('Usuário já cadastrado')
    })

    it('Caso não seja possível salvar o usuário na base de dados, um erro deve ser lançado.', function () { // 2
      let add = jest.spyOn(userRepository, 'add');
      add.mockReturnValue(false)
      expect(()=>{
        registerUserOnMailingList.execute(
          {
            name: "Anderson",
            email: "anderson@gmail.com",
          }
        ) 
      }).toThrow('Usupario não cadastrado na base')
    })

    it('Caso a notificação por e-mail não tenha sido enviada, um erro deve ser lançado.', function () { // 3
      let send = jest.spyOn(emailNotificationService, 'send');
      send.mockReturnValue(false);
      
      let add = jest.spyOn(userRepository, 'add');
      add.mockReturnValue(true)


      
      expect(()=>{
        registerUserOnMailingList.execute(
          {
            name: "Anderson",
            email: "anderson@gmail.com",
          }
        ) 
      }).toThrow('Notificação por email não enviada')
    })
})*/
