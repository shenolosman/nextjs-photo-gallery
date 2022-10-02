import ImageGrid from "../components/ImageGrid";
import Title from "../components/Title";
import UploadForm from "../components/UploadForm";

export default function Home() {
  return (
    <div className="App">
      <Title />
      <UploadForm />
      <ImageGrid/>
    </div>
  );
}
