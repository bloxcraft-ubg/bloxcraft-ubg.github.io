    const API_BASE = "https://feedback-api.dk-ubg.workers.dev";

    async function loadAverageRating() {
      try {
        const res = await fetch(`${API_BASE}/api/feedback/json/total.json`);
        const data = await res.json();
        document.getElementById("avgRatingBadge").innerText = `⭐ Average Rating: ${data.rating} / 5`;
      } catch (err) {
        document.getElementById("avgRatingBadge").innerText = `⭐ Average Rating: N/A`;
      }
    }

    async function loadRatings() {
      try {
        const res = await fetch(`${API_BASE}/api/feedback/json/ratings.json`);
        const ratings = await res.json();
        const container = document.getElementById("reviewsList");
        container.innerHTML = "";

        if (!ratings || ratings.length === 0) {
          container.innerHTML = `<p style="color: #a0a5ba; text-align: center;">No feedback yet.</p>`;
          return;
        }

        ratings.reverse().forEach(item => {
          const div = document.createElement("div");
          div.className = "review-item";
          div.innerHTML = `
            <div class="review-top">
              <span class="review-author">${escapeHtml(item.name)}</span>
              <span class="review-stars">${"★".repeat(item.stars)}${"☆".repeat(5 - item.stars)}</span>
            </div>
            <div class="review-title">${escapeHtml(item.title)}</div>
            <div class="review-desc">${escapeHtml(item.description)}</div>
          `;
          container.appendChild(div);
        });
      } catch (err) {
        document.getElementById("reviewsList").innerHTML = `<p style="color: #e57373; text-align: center;">Failed to load reviews.</p>`;
      }
    }

    document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
      e.preventDefault();

      const statusMsg = document.getElementById("statusMsg");
      const submitBtn = document.getElementById("submitBtn");

      statusMsg.className = "status-msg";
      statusMsg.style.display = "none";
      submitBtn.disabled = true;
      submitBtn.innerText = "Submitting...";

      const payload = {
        name: document.getElementById("name").value,
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        stars: parseInt(document.getElementById("stars").value, 10)
      };

      try {
        const res = await fetch(`${API_BASE}/api/feedback/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        const result = await res.json();

        if (res.ok) {
          statusMsg.className = "status-msg success";
          statusMsg.innerText = "Feedback submitted successfully!";
          document.getElementById("feedbackForm").reset();
          loadRatings();
          loadAverageRating();
        } else {
          statusMsg.className = "status-msg error";
          statusMsg.innerText = result.error || "Submission failed.";
        }
      } catch (err) {
        statusMsg.className = "status-msg error";
        statusMsg.innerText = "Network error. Please try again.";
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = "Submit Feedback";
      }
    });

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    loadAverageRating();
    loadRatings();
