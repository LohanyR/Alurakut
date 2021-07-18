import {SiteClient} from 'datocms-client';

export default async function recebedorDeRequest(request, response) {
  if(request.method === 'POST') {
    const TOKEN= 'b174614fe035b4a731c6b65f6c45b0';
    const client= new SiteClient(TOKEN);

    // Validar os dados, antes de sair cadastrando
      const registroCriado= await client.items.create({
        itemType: "975956",//ID do model o dato 
        ...request.body,//usado para pegar qualquer url
        //title: 'Comunidade de Teste', 
        //imageUrl: 'https://github.com/LohanyR.png', 
        //creatorSlug: 'LohanyR'
    })

    console.log(registroCriado);

    response.json ({
      dados: 'algum dado qualquer', 
      registroCriado: registroCriado,
    })

    return;
  }

  response.status(404).json({
    message: 'ainda não temos nada no GET, mas no POST tem!'
  })
}

