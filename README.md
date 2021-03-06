# Instructor

It shows overlays on things on the page and pulls an explanation for them.

[Download JS](https://raw.githubusercontent.com/TabDigital/instructor/master/dist/instructor.js) ⊙ [Download CSS](https://raw.githubusercontent.com/TabDigital/instructor/master/dist/instructor.css)

### Usage

Instance a new instructor. Pass a root node and an instructions object (see
  `mock-instructions.js`) to it.

      let instructor = new Instructor(document.body, {
        instructions: instructionsObject
      })

      instructor.showNextInstructable()

The `showNextInstructable` method will show the next (or first if none has
  been shown) available instruction for elements in the page that carry the
  necessary `data-instructable` attribute. The value for the attribute should
  be the unique key used to find the corresponding instruction in the
  instructions object.

Like so:

    <div class="some-form" data-instructable="some-form">
      …
    </div>

Where `some-form` maps to a key in the instructions object.
