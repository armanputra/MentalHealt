import React, { useState } from "react";

const QuestionForm: React.FC = () => {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [errors, setErrors] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const isFormComplete = () => {
    const fields = [
      "perasaan",
      "kecemasan",
      "tidur",
      "energi",
      "sosialisasi",
      "konsentrasi",
      "jam_tidur",
    ];
    return fields.every(
      (field) => responses[field] && responses[field].trim() !== ""
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setResponses({
      ...responses,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormComplete()) {
      setErrors("Harap isi semua field sebelum mengirim.");
      return;
    } else {
      setErrors(null);
    }

    const score = calculateScore(responses);
    const condition = determineCondition(score);
    const suggestion = generateSuggestion(score);
    setResult(condition);
    setSuggestion(suggestion);

    setIsModalOpen(true);
    setResponses({});
  };

  const calculateScore = (responses: Record<string, string>): number => {
    let score = 0;
    if (responses.perasaan) {
      score +=
        [
          "Sangat bahagia",
          "Bahagia",
          "Netral",
          "Sedih",
          "Sangat sedih",
        ].indexOf(responses.perasaan) + 1;
    }
    if (responses.kecemasan) {
      score +=
        [
          "Tidak sama sekali",
          "Kadang-kadang",
          "Sering",
          "Sangat sering",
        ].indexOf(responses.kecemasan) + 1;
    }
    if (responses.tidur) {
      score +=
        [
          "Tidak sama sekali",
          "Kadang-kadang",
          "Sering",
          "Sangat sering",
        ].indexOf(responses.tidur) + 1;
    }
    if (responses.jam_tidur) {
      const jam_tidur = parseInt(responses.jam_tidur, 10);
      if (jam_tidur < 5) score += 4;
      else if (jam_tidur < 7) score += 3;
      else if (jam_tidur < 9) score += 2;
      else score += 1;
    }
    if (responses.energi) {
      score +=
        ["Sangat tinggi", "Tinggi", "Cukup", "Rendah", "Sangat rendah"].indexOf(
          responses.energi
        ) + 1;
    }
    if (responses.sosialisasi) {
      score +=
        [
          "Sangat sering",
          "Sering",
          "Kadang-kadang",
          "Jarang",
          "Sangat jarang",
        ].indexOf(responses.sosialisasi) + 1;
    }
    if (responses.konsentrasi) {
      score +=
        [
          "Sangat mudah",
          "Mudah",
          "Cukup mudah",
          "Sulit",
          "Sangat sulit",
        ].indexOf(responses.konsentrasi) + 1;
    }
    return score;
  };

  const determineCondition = (score: number): string => {
    if (score <= 7) return "Kesehatan mental Anda sangat baik!";
    if (score <= 14) return "Kesehatan mental Anda baik.";
    if (score <= 21) return "Kesehatan mental Anda kurang baik.";
    return "Kesehatan mental Anda sangat kurang baik. Silakan konsultasi dengan profesional.";
  };

  const generateSuggestion = (score: number): string => {
    if (score <= 7)
      return "Pertahankan kebiasaan positif Anda. Jaga pola tidur, makan sehat, dan tetap aktif secara fisik.";
    if (score <= 14)
      return "Anda berada dalam kondisi yang baik. Namun, perhatikan tanda-tanda stres dan cemas. Luangkan waktu untuk relaksasi.";
    if (score <= 21)
      return "Perhatikan kesehatan mental Anda. Cobalah teknik relaksasi seperti meditasi atau yoga. Pertimbangkan untuk berbicara dengan teman atau keluarga.";
    return "Segera cari bantuan profesional. Berbicara dengan psikolog atau konselor dapat membantu Anda mengatasi masalah ini.";
  };

  return (
    <div className="card bg-base-100 shadow-xl p-6 max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">
        Cek Kesehatan Mental Anda
      </h2>
      <form onSubmit={handleSubmit}>
        {[
          {
            name: "perasaan",
            label: "Bagaimana perasaan Anda hari ini?",
            options: [
              "Sangat bahagia",
              "Bahagia",
              "Netral",
              "Sedih",
              "Sangat sedih",
            ],
          },
          {
            name: "kecemasan",
            label: "Apakah Anda merasa cemas atau gelisah?",
            options: [
              "Tidak sama sekali",
              "Kadang-kadang",
              "Sering",
              "Sangat sering",
            ],
          },
          {
            name: "tidur",
            label: "Apakah Anda merasa sulit tidur?",
            options: [
              "Tidak sama sekali",
              "Kadang-kadang",
              "Sering",
              "Sangat sering",
            ],
          },
          {
            name: "energi",
            label: "Bagaimana tingkat energi Anda?",
            options: [
              "Sangat tinggi",
              "Tinggi",
              "Cukup",
              "Rendah",
              "Sangat rendah",
            ],
          },
          {
            name: "sosialisasi",
            label: "Seberapa sering Anda bersosialisasi dengan orang lain?",
            options: [
              "Sangat sering",
              "Sering",
              "Kadang-kadang",
              "Jarang",
              "Sangat jarang",
            ],
          },
          {
            name: "konsentrasi",
            label: "Seberapa mudah Anda berkonsentrasi pada tugas?",
            options: [
              "Sangat mudah",
              "Mudah",
              "Cukup mudah",
              "Sulit",
              "Sangat sulit",
            ],
          },
        ].map((field) => (
          <div className="form-control mt-4" key={field.name}>
            <label className="label">
              <span className="label-text">{field.label}</span>
            </label>
            <select
              name={field.name}
              className="select select-bordered w-full"
              onChange={handleChange}
              value={responses[field.name] || ""}
            >
              <option value="">Pilih...</option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">
              Berapa jam Anda tidur rata-rata setiap malam?
            </span>
          </label>
          <input
            type="number"
            name="jam_tidur"
            className="input input-bordered w-full"
            onChange={handleChange}
            value={responses.jam_tidur || ""}
            min="0"
            max="24"
          />
        </div>

        {errors && (
          <div className="alert alert-error mt-4">
            <div className="flex-1">
              <label>{errors}</label>
            </div>
          </div>
        )}

        {isFormComplete() && (
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Kirim
            </button>
          </div>
        )}
      </form>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl animate__animated animate__fadeIn animate__faster">
            <h3 className="text-lg font-bold text-center text-primary">
              Hasil Pengecekan Kesehatan Mental
            </h3>
            {result && <p className="py-4 text-base text-primary">{result}</p>}
            {suggestion && (
              <p className="py-4 text-base text-primary">{suggestion}</p>
            )}
            <div className="modal-action flex justify-center">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-primary"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionForm;
