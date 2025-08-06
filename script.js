document.getElementById("buscar").addEventListener("click", () => {
    const nomeFilme = document.getElementById("titulo-filme").value.toLowerCase().trim();
    const resultado = document.getElementById("resultado");

    if (!nomeFilme) {
        resultado.innerHTML = "<p style='color: red;'>Digite o nome de um filme.</p>";
        return;
    }

    resultado.innerHTML = "Buscando...";

    fetch('https://ghibliapi.vercel.app/films')
        .then(res => {
            if (!res.ok) {
                throw new Error("Erro ao buscar dados.");
            }
            return res.json();
        })
        .then(filmes => {
            const filme = filmes.find(f => f.title.toLowerCase() === nomeFilme);
            if (!filme) {
                resultado.innerHTML = "<p style='color: red;'>Filme não encontrado.</p>";
                return;
            }

            resultado.innerHTML = `
                <h3>${filme.title.toUpperCase()}</h3>
                <p><strong>Título:</strong> ${filme.title}</p>
                <p><strong>Descrição:</strong> ${filme.description}</p>
                <p><strong>Diretor:</strong> ${filme.director}</p>
                <p><strong>Ano de Lançamento:</strong> ${filme.release_date}</p>
            `;
        })
        .catch(error => {
            resultado.innerHTML = "<p style='color: red;'>Erro: " + error.message + "</p>";
        });
});
