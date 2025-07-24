  export function scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth' // นี่คือคุณสมบัติที่ทำให้การเลื่อนเป็นไปอย่างนุ่มนวล
        });
    }
  }