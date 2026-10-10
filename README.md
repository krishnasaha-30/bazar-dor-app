<div align="center">

# 🛒 বাজার দর (BazarDor)

**প্রয়োজনীয় পণ্যের দাম এক নজরে।**

[Live Site](https://bazar-dor-app-theta.vercel.app/) 

</div>

---

## 📖 About

BazarDor (বাজার দর) is a responsive web app that shows today's market prices of everyday essentials such as rice, lentils, oil, vegetables, fish and meat. It highlights which products got more expensive or cheaper today, lets you browse by category, and shows a bazar-by-bazar price breakdown for each product.

---

## 🧰 Technologies Used

| Purpose | Technology |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) (App Router) |
| UI library | [React 19](https://react.dev) with the React Compiler |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) + [daisyUI 5](https://daisyui.com) |
| Authentication | [BetterAuth](https://better-auth.com) (email/password, Google, GitHub) |
| Database | MongoDB via `@better-auth/mongo-adapter` |
| Notifications | [react-hot-toast](https://react-hot-toast.com) |
| Price ticker | [react-marquee-text](https://www.npmjs.com/package/react-marquee-text) |
| Deployment | Vercel |

---

## ✨ Key Features

1. **📈 Live price ticker.** An infinitely scrolling strip shows each product's emoji, name, price per unit and a ▲/▼ percentage change.
2. **🔺🔻 Daily price movers.** The home page lists the top 6 products whose price rose and the top 6 whose price fell today, followed by the full product grid with a hero button that scrolls straight to it.
3. **🗂️ Category pages with sorting.** Browse by category and sort by default, price low to high, or price high to low. Sorting handles Bengali numerals correctly, and skeleton loaders show while data loads.
4. **🔒 Protected product details.** After signing in, view a product's minimum, maximum and average price along with its price in each bazar.
5. **👤 Full authentication.** Sign up and sign in with email/password, Google or GitHub, get toast feedback for every action, and update your profile name.

📱 Also included: a fully responsive layout (mobile, tablet, desktop), a custom 404 page, and Bengali date and number formatting throughout.



<div align="center">

সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।

</div>
