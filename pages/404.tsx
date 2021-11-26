import { DietManagerLogo } from '@components/decoration/logos';
import { Button, IconButton } from '@material-ui/core';
import Link from 'next/link';

const _404: NextPage = () => {
  return (
    <div className="min-h-screen pt-16 pb-12 flex flex-col bg-white">
      <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex-shrink-0 flex justify-center">
          <Link href="/">
            <IconButton className="h-16 w-16 p-0 inline-flex">
              <DietManagerLogo className="h-16 w-16" />
            </IconButton>
          </Link>
        </div>
        <div className="pb-16 pt-8">
          <div className="text-center">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wide">
              Erro 404
            </p>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
              Página não encontrada.
            </h1>
            <p className="mt-2 text-base text-gray-500">
              Não foi possível encontrar a página que você está procurando.
            </p>
            <div className="mt-6">
              <Link href="/" passHref>
                <Button
                  variant="contained"
                  className="text-base font-medium shadow-primary-500 hover:shadow-xl-primary-500"
                >
                  Ir para o início
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-center space-x-4">
          <Link href="/support" passHref>
            <Button className="text-sm font-medium text-gray-500 hover:text-gray-600">
              Contate o Suporte
            </Button>
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default _404;
