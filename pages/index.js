
// const Title = styled.h1`
//  font-size: 50px;
//  color: ${({ theme }) => theme.colors.primary};
//`
import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
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

function ProfileRelationsBox(propriedades){
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className= "smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
        {/*comunidades.map((itemAtual) => {
          return (
            <li>
              <a href={`/users/${itemAtual.title}`} key={itemAtual.title}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )

        })}*/} 
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  const usuario = props.githubUser;
  const [comunidades, setComunidades] = React.useState([]);
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

  const [seguidores, setSeguidores]= React.useState([]);

  React.useEffect(function(){
    fetch('https://api.github.com/users/LohanyR/followers')
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })

    .then(function(respostaCompleta) {
      setSeguidores(respostaCompleta);
    }) 

    //API GraphQL
    fetch("https://graphql.datocms.com/", {
      method: 'POST',

      headers: {
        'Authorization': '34933f13b54f7d7d17a870d5604c90',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },

      body: JSON.stringify ({  "query": `query{
        allCommunities {
         id
         title
         imageUrl
         creatorSlug
        }
      }`})
    })

    .then((response) => response.json())//pega e responde
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      console.log(comunidadesVindasDoDato)
      setComunidades(comunidadesVindasDoDato)
    })
    
  }, [])

  console.log('seguidores antes do return', seguidores);
    
  return( 
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
                //id: new Date().toISOString() não precisa mais porq ja tem creatorslug
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: usuario,
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'content-Type': 'application/json'
                },
                body: JSON.stringify(comunidade)
              })

              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comunidades = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas)
              })

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
        <ProfileRelationsBox title="Seguidores" items={seguidores}/>
        <ProfileRelationsBoxWrapper>
        <h2 className= "smallTitle">
          Comunidades ({comunidades.length})
        </h2>
        <ul>
          {comunidades.map((itemAtual) => {
            return (
              <li key={itemAtual.id}>
                <a href={`/communities/${itemAtual.id}`}>
                  <img src={itemAtual.imageUrl}/>
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

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
        Authorization: token
      }
  })
  .then((resposta) => resposta.json())

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
} 
