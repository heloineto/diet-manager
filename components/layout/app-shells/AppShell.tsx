import AuthCheck from '@components/auth/AuthCheck';
import NavBar from '@components/navigation/NavBar';
import clsx from 'clsx';

interface Props {
  rightSection: JSX.Element;
  leftSection: JSX.Element;
}

const AppShell = ({ rightSection, leftSection }: Props) => {
  return (
    <AuthCheck>
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <main className="-mt-24 pb-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Page title</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                {leftSection}
              </div>

              {/* Right column */}
              <div className="grid grid-cols-1 gap-4">{rightSection}</div>
            </div>
          </div>
        </main>
        <footer>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left">
              <span className="block sm:inline">
                &copy; {'2021 Diet Manager Ltd. '}
              </span>
              <span className="block sm:inline">All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </AuthCheck>
  );
};

export default AppShell;
