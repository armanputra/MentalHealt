
import AppNavbar from "./components/AppNavbar";
import QuestionForm from "./components/QuestionForm";
import AppFooter from "./components/AppFooter";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppNavbar />
      <main className="flex-grow container mx-auto p-6">
        <QuestionForm />
      </main>
      <AppFooter />
    </div>
  );
}

export default App;
