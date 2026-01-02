import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  export default function Empresa() {
    return (
      <section className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-green-700">
          Sobre a AgroPetDev
        </h1>
  
        <p className="mb-4 leading-relaxed">
          A <strong>AgroPetDev</strong> nasceu da união entre o amor pelo campo, o
          cuidado com os animais e a vontade de oferecer soluções práticas e de
          qualidade para o dia a dia de nossos clientes.
        </p>
  
        <p className="mb-4 leading-relaxed">
          Fundada em <strong>2016</strong>, a AgroPetDev iniciou suas atividades
          como uma pequena loja local, atendendo produtores rurais, famílias e
          apaixonados por animais. Com o passar dos anos, expandimos nosso
          portfólio e nos tornamos referência em produtos para
          <strong> piscina, jardim, cães, gatos e aves</strong>.
        </p>
  
        <p className="mb-8 leading-relaxed">
          Trabalhamos com uma seleção criteriosa de materiais para manutenção de
          piscinas, ferramentas e acessórios para jardinagem, além de rações,
          medicamentos, brinquedos e itens essenciais para o bem-estar dos
          animais.
        </p>
  
        {/* Cards apenas para destacar a identidade da empresa */}
        <div className="grid gap-6 md:grid-cols-3 my-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">Missão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                Oferecer produtos de qualidade, com preço justo e atendimento
                humano, ajudando nossos clientes a cuidarem melhor de seus
                espaços, animais e projetos.
              </p>
            </CardContent>
          </Card>
  
          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">Visão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                Ser reconhecida como uma agropecuária moderna, confiável e
                inovadora, unindo tradição e tecnologia para atender clientes de
                todo o Brasil.
              </p>
            </CardContent>
          </Card>
  
          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">Valores</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Respeito aos clientes e aos animais</li>
                <li>Compromisso com qualidade</li>
                <li>Transparência e confiança</li>
                <li>Atendimento próximo</li>
                <li>Inovação contínua</li>
              </ul>
            </CardContent>
          </Card>
        </div>
  
        <p className="mt-8 leading-relaxed">
          A <strong>AgroPetDev</strong> é mais do que uma agropecuária: é um
          parceiro para quem busca cuidar bem do que ama, seja no campo, no
          jardim, na piscina ou com seus animais.
        </p>
      </section>
    );
  }
  