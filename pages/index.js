
// const Title = styled.h1`
//  font-size: 50px;
//  color: ${({ theme }) => theme.colors.primary};
//`
import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'


function ProfileSidebar(propriedades) {
  return(
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style= {{ borderRadius: '8px'}}/>
      <hr/>

      <p>
       <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
         @{propriedades.githubUser}
       </a>
      </p>

      <hr/>

      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}

export default function Home() {
  const usuario = 'LohanyR';
  const [comunidades, setComunidades] = React.useState([{
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  //const comunidades = comunidades[0];
  //const alteradorDecomunidades/setComunidades = comunidades[1];
  
  console.log('Nosso teste', )
  //const comunidades = ['Aluakut'];
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  return ( 
    <>
     <AlurakutMenu/>
     <MainGrid>
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        <ProfileSidebar githubUser= {usuario}/>
      </div> 
      <div className="WelcomeArea" style={{ gridArea: 'welcomeArea' }}> 
        <Box>
          <h1 className= "title">
           Bem-vindo
          </h1>
          <OrkutNostalgicIconSet/>
        </Box>

        <Box>
          <h2 className="subTitle">O que você vai fazer?</h2>
          <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              console.log('Campo: ', dadosDoForm.get('title'));
              console.log('Campo: ', dadosDoForm.get('image'));

              const comunidade = {
                
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
              }

              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas)
            }}>
            <div>
              <input
                placeholder="Qual vai ser o nome da sua comunidade?"
                name="title"
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"
              />
            </div>
            <div>
              <input
               placeholder="Coloque uma URL para usarmos de capa"
               name="image"
               aria-label="Coloque uma URL para usarmos de capa"
              />
            </div>

            <button>
              Criar comunidade
            </button>
          </form>
        </Box>
      </div>
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
        <ProfileRelationsBoxWrapper>
        <h2 className= "smallTitle">
            Comunidades ({comunidades.length})
          </h2>
          <ul>
            {comunidades.map((itemAtual) => {
              return (
                <li>
                  <a href={`/users/${itemAtual.title}`} key={itemAtual.title}>
                    <img src={itemAtual.image} />
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
              )

            })}
          </ul>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper>
          <h2 className= "smallTitle">
            Amigos ({pessoasFavoritas.length})
          </h2>
         
          
          <ul>
           {pessoasFavoritas.map((itemAtual) => {
              return (
                <li>
                  <a href={`/users/${itemAtual}`} key={itemAtual}>
                    <img src={`https://github.com/${itemAtual}.png`} />
                    <span>{itemAtual}</span>
                  </a>
                </li>
              )

            })}
          </ul>
        </ProfileRelationsBoxWrapper>
      </div>
     </MainGrid>
    </>
  )
}
