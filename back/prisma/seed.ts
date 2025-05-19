
import { PrismaClient, ApplicationStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

 
const clients = [
  {
    name: 'João Silva',
    email: 'joao.silva@example.com',
    age: 22,
    income: 3500,
  },
  {
    name: 'Maria Oliveira',
    email: 'maria.oliveira@example.com',
    age: 45,
    income: 12000,
  },
  {
    name: 'Carlos Souza',
    email: 'carlos.souza@example.com',
    age: 60,
    income: 8000,
  },
  {
    name: 'Ana Pereira',
    email: 'ana.pereira@example.com',
    age: 30,
    income: 5000,
  },
];

  
  for (const client of clients) {
    await prisma.client.upsert({
      where: { email: client.email },
      update: {},
      create: client,
    });
  }


  const fixedJuros = await prisma.creditModality.upsert({
    where: { name: 'Crédito com Juros Fixos' },
    update: {},
    create: {
      name: 'Crédito com Juros Fixos',
      minAge: 18,
      maxAge: 25,
      interestRate: 5.0, 
      interestType: 'FIXED',
      maxTermYears: 40,
      description: 'Aplicado a clientes com idade entre 18 e 25 anos, independente de renda. Taxa de 5% a.a. Prazo de 40 anos.',
      isActive: true,
    },
  });

  const ipcaJuros = await prisma.creditModality.upsert({
    where: { name: 'Crédito com Juros Variáveis (IPCA)' },
    update: {},
    create: {
      name: 'Crédito com Juros Variáveis (IPCA)',
      minAge: 21,
      maxAge: 65,
      minIncome: 5000.00,
      maxIncome: 15000.00,
      interestType: 'IPCA_LINKED', 
      maxTermYears: 30,
      description: 'Aplicado a clientes com idade entre 21 e 65 anos, com renda entre R$ 5000,00 e R$ 15000,00. Prazo de 30 anos.',
      isActive: true,
    },
  });

  const trJuros = await prisma.creditModality.upsert({
    where: { name: 'Crédito com Juros Variáveis (TR)' },
    update: {},
    create: {
      name: 'Crédito com Juros Variáveis (TR)',
      minAge: 21,
      maxAge: 45,
      minIncome: 5000.00,
      maxIncome: 15000.00,
      interestType: 'TR_LINKED',
      maxTermYears: 20,
      description: 'Aplicado a clientes com idade entre 21 e 45 anos, com renda entre R$ 5000,00 e R$ 15000,00. Prazo de 20 anos.',
      isActive: true,
    },
  });

  const consorcio = await prisma.creditModality.upsert({
    where: { name: 'Crédito Consórcio' },
    update: {},
    create: {
      name: 'Crédito Consórcio',
      minAge: 40,
      adminFeePercentage: 20.0, 
      interestType: 'ADMIN_FEE_CONSORTIUM',
      maxTermYears: 10,
      description: 'Aplicado a clientes acima de 40 anos, independente de renda. Prazo de 10 anos. Taxa de Administração de 20% do valor total do imóvel.',
      isActive: true,
    },
  });
  console.log({ fixedJuros, ipcaJuros, trJuros, consorcio });

  
  const aptoNovo = await prisma.financingLine.upsert({
    where: { name: 'Apartamento novo' },
    update: {},
    create: {
      name: 'Apartamento novo',
      propertyType: 'NEW_APARTMENT',
      description: 'Qualquer modalidade de crédito.',
      isActive: true,
      
    },
  });

  const aptoUsado = await prisma.financingLine.upsert({
    where: { name: 'Apartamento usado' },
    update: {},
    create: {
      name: 'Apartamento usado',
      propertyType: 'USED_APARTMENT',
      description: 'Não pode ser consórcio.',
      disallowedModalityTypes: ['ADMIN_FEE_CONSORTIUM'], 
      isActive: true,
    },
  });

  const terrenoConstrucao = await prisma.financingLine.upsert({
    where: { name: 'Aquisição de Terreno e Construção' },
    update: {},
    create: {
      name: 'Aquisição de Terreno e Construção',
      propertyType: 'LAND_AND_CONSTRUCTION',
      description: 'Qualquer modalidade de crédito.',
      isActive: true,
    },
  });

  const construcaoProprio = await prisma.financingLine.upsert({
    where: { name: 'Construção em Terreno Próprio' },
    update: {},
    create: {
      name: 'Construção em Terreno Próprio',
      propertyType: 'CONSTRUCTION_OWN_LAND',
      description: 'Não pode ser consórcio.',
      disallowedModalityTypes: ['ADMIN_FEE_CONSORTIUM'],
      isActive: true,
    },
  });
  console.log({ aptoNovo, aptoUsado, terrenoConstrucao, construcaoProprio });

  const client1 = await prisma.client.findFirst({
    where: { email: 'alice.wonderland@example.com' }, 
  });
  if (!client1) {
    throw new Error('Client not found');
  }


  
  const application1 = await prisma.creditApplication.create({
    data: {
      client: { connect: { id: client1.id } },
      creditModality: { connect: { id: fixedJuros.id } },
      financingLine: { connect: { id: aptoNovo.id } },

      status: ApplicationStatus.PENDING,
    },
  });
  console.log({ application1 });


  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });